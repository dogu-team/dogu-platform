import { CloseOutlined } from '@ant-design/icons';
import {
  BillingPlanGroupMap,
  BillingSubscriptionGroupType,
  GetAvailableBillingCouponsDto,
} from '@dogu-private/console';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import { usePromotionCouponSWR } from '../../api/billing';
import { planDescriptionInfoMap } from '../../resources/plan';
import usePromotionStore from '../../stores/promotion';
import UpgradePlanButton from './UpgradePlanButton';

interface Props {
  expiredAt: Date;
}

const BannerTimer: React.FC<Props> = ({ expiredAt }) => {
  const [now, setNow] = useState(new Date().getTime());
  const { t } = useTranslation('billing');

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date().getTime());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getLeftDays = (leftTime: number) => {
    const days = Math.floor(leftTime / 86400);
    const hours = Math.floor((leftTime % 86400) / 3600);
    const minutes = Math.floor(((leftTime % 86400) % 3600) / 60);
    const seconds = Math.floor(((leftTime % 86400) % 3600) % 60);

    if (days === 0 && hours === 0 && minutes === 0) {
      return `0m ${seconds}s`;
    }

    if (days === 0 && hours === 0) {
      return `${minutes}m ${seconds}s`;
    }

    if (days === 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }

    return `${days}d ${hours}h`;
  };

  return (
    <span>(⏰ {t('promotionBannerTimerLeftText', { time: getLeftDays((expiredAt.getTime() - now) / 1000) })})</span>
  );
};

const PromotionBanner: React.FC = () => {
  const { currentPlanType, isPromotionOpenablePage } = usePromotionStore(
    (state) => ({
      currentPlanType: state.currentPlanType,
      isPromotionOpenablePage: state.isPromotionOpenablePage,
    }),
    shallow,
  );
  const [promotionCloseMap, savePromotionCloseTime] = usePromotionStore((state) => [
    state.promotionCloseMap,
    state.savePromotionCloseTime,
  ]);
  const dto: Omit<GetAvailableBillingCouponsDto, 'type' | 'organizationId'> = {
    category: process.env.NEXT_PUBLIC_ENV === 'self-hosted' ? 'self-hosted' : 'cloud',
    planType: currentPlanType ?? undefined,
  };
  const { data } = usePromotionCouponSWR(isPromotionOpenablePage, dto);
  const { t } = useTranslation('billing');

  if (!currentPlanType || !data.length) {
    return null;
  }

  const promotion = data[0];

  const isVisible =
    !promotionCloseMap[currentPlanType] ||
    new Date(promotion.createdAt).getTime() > new Date(promotionCloseMap[currentPlanType]!).getTime();

  if (!isVisible) {
    return null;
  }

  const planDescription = planDescriptionInfoMap[currentPlanType];
  const planGroupType = Object.keys(BillingPlanGroupMap).find((key) =>
    BillingPlanGroupMap[key as BillingSubscriptionGroupType].includes(currentPlanType),
  ) as BillingSubscriptionGroupType | undefined;
  const expiredAt = promotion.expiredAt ? new Date(promotion.expiredAt) : null;

  return (
    <AlertBanner>
      ✨ [{t(planDescription.titleI18nKey)}]{' '}
      {promotion.applyCount !== null
        ? t(promotion.applyCount > 1 ? 'promotionBannerMonthPluralMessage' : 'promotionBannerMonthSingularMessage', {
            month: promotion.applyCount,
            discount: promotion.discountPercent,
          })
        : ''}
      <StyledButton groupType={planGroupType ?? null}>{t('promotionBannerButtonText')} 🚀</StyledButton>
      {!!expiredAt && <BannerTimer expiredAt={expiredAt} />}
      <CloseAlertButton
        onClick={() => {
          savePromotionCloseTime(currentPlanType);
        }}
      >
        <CloseOutlined />
      </CloseAlertButton>
    </AlertBanner>
  );
};

export default PromotionBanner;

const AlertBanner = styled.div`
  padding: 0.25rem 2rem;
  font-size: 0.85rem;
  background-color: ${(props) => props.theme.main.colors.blue3};
  line-height: 1.5;
  text-align: center;
  color: #fff;

  a {
    color: #76f17e;
    text-decoration: underline;
  }
`;

const CloseAlertButton = styled.button`
  position: absolute;
  padding: 0 0.25rem;
  right: 2rem;
  border-radius: 4px;
  background-color: transparent;

  &:hover {
    background-color: ${(props) => props.theme.main.colors.blue5};
  }
`;

const StyledButton = styled(UpgradePlanButton)`
  background-color: ${(props) => props.theme.main.colors.blue3};
  padding: 0;
  margin: 0 0.4rem;
  border: none;
  color: #fff;
  height: auto;
  font-size: 0.85rem;
  font-weight: 600;

  span {
    text-decoration: underline;
  }
`;

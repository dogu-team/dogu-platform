import {
  BillingPlanGroupMap,
  BillingSubscriptionGroupType,
  BillingPlanInfoResponse,
  CloudLicenseResponse,
} from '@dogu-private/console';
import { assertUnreachable } from '@dogu-tech/common';
import { Alert, List, MenuProps, Modal, Tag } from 'antd';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { sort } from 'ramda';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import { cancelChangePlanOptionOrPeriod, cancelUnsubscribePlan, unsubscribePlan } from '../../api/billing';
import useModal from '../../hooks/useModal';
import useRequest from '../../hooks/useRequest';
import { groupTypeI18nKeyMap, groupTypeSortMap, planDescriptionInfoMap } from '../../resources/plan';
import useBillingPlanPurchaseStore from '../../stores/billing-plan-purchase';
import useLicenseStore from '../../stores/license';
import { flexRowBaseStyle, listItemStyle, tableCellStyle, tableHeaderStyle } from '../../styles/box';
import { sendErrorNotification, sendSuccessNotification } from '../../utils/antd';
import { getLocaleFormattedDate } from '../../utils/locale';
import MenuButton from '../buttons/MenuButton';
import MenuItemButton from '../buttons/MenuItemButton';
import BillingPaymentMethodPaddle from './BillingPaymentMethodPaddle';
import UpgradePlanModal from './UpgradePlanModal';

interface OptionProps {
  plan: BillingPlanInfoResponse;
}

const PlanOption: React.FC<OptionProps> = ({ plan }) => {
  const { t } = useTranslation('billing');
  const router = useRouter();
  const [isOpen, openModal, closeModal] = useModal();
  const [loading, requestCancelChangePlan] = useRequest(cancelChangePlanOptionOrPeriod);
  const updateGroupType = useBillingPlanPurchaseStore((state) => state.updateBillingGroupType);
  const updateIsAnnual = useBillingPlanPurchaseStore((state) => state.updateIsAnnual);
  const [license, updateLicense] = useLicenseStore((state) => [state.license, state.updateLicense], shallow);

  const description = planDescriptionInfoMap[plan.type];
  const isAnnual = plan.period === 'yearly';

  const clickChangeOption = () => {
    const groupType = BillingSubscriptionGroupType.find((group) => BillingPlanGroupMap[group].includes(plan.type));
    updateGroupType(groupType ?? null);
    // annual plan is not available for now
    // updateIsAnnual(isAnnual);
    openModal();
  };

  const clickCancelChangeOption = async () => {
    if (!license) {
      return;
    }

    try {
      const rv = await requestCancelChangePlan(plan.billingPlanInfoId, {
        organizationId: license.organizationId,
      });

      if (rv.errorMessage || !rv.body) {
        sendErrorNotification(t('cancelChangeOptionErrorMessage'));
        return;
      }

      sendSuccessNotification(t('cancelChangeOptionSuccessMessage'));
      updateLicense({
        ...license,
        billingOrganization: {
          ...license.billingOrganization,
          billingPlanInfos: [
            ...license.billingOrganization.billingPlanInfos.filter(
              (p) => p.billingPlanInfoId !== plan.billingPlanInfoId,
            ),
            rv.body,
          ],
        },
      });
    } catch (e) {
      sendErrorNotification('cancelChangeOptionErrorMessage');
    }
  };

  return (
    <div>
      <div>
        {t(description.getOptionLabelI18nKey(plan.option), { option: plan.option })} /{' '}
        {t(isAnnual ? 'monthCountPlural' : 'monthCountSingular', { month: isAnnual ? 12 : 1 })}
      </div>
      {plan.state === 'change-option-or-period-requested' && plan.changeRequestedOption && (
        <div style={{ marginTop: '.25rem' }}>
          <ChangeRequestedOptionText>
            <Trans
              i18nKey="billing:planChangeOptionRequestedText"
              components={{
                option: (
                  <b>
                    {t(description.getOptionLabelI18nKey(plan.changeRequestedOption), {
                      option: plan.changeRequestedOption,
                    })}{' '}
                    /{' '}
                    {t(plan.changeRequestedPeriod === 'yearly' ? 'monthCountPlural' : 'monthCountSingular', {
                      month: plan.changeRequestedPeriod === 'yearly' ? 12 : 1,
                    })}
                  </b>
                ),
              }}
            />
          </ChangeRequestedOptionText>
          <div>
            <CancelChangeOptionButton onClick={clickChangeOption} disabled={loading}>
              {t('changeOptionButtonText')}
            </CancelChangeOptionButton>
            <CancelChangeOptionButton style={{ color: '#e35f5f' }} onClick={clickCancelChangeOption} disabled={loading}>
              {t('cancelChangeOptionButtonText')}
            </CancelChangeOptionButton>
          </div>

          <UpgradePlanModal isOpen={isOpen} close={closeModal} />
        </div>
      )}
    </div>
  );
};

interface NextChargeProps {
  plan: BillingPlanInfoResponse;
}

const NextCharge: React.FC<NextChargeProps> = ({ plan }) => {
  const router = useRouter();
  const { t } = useTranslation('billing');

  if (plan.state === 'unsubscribe-requested') {
    return (
      <div>
        {t('planNextChargeUnsubscribeRequestedText', {
          date: getLocaleFormattedDate(router.locale, new Date(plan.expiredAt!), {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
          }),
        })}
      </div>
    );
  }

  return (
    <div>
      {!!plan.expiredAt
        ? getLocaleFormattedDate(router.locale, new Date(plan.expiredAt!), {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })
        : 'N/A'}
    </div>
  );
};

interface StateProps {
  plan: BillingPlanInfoResponse;
}

const StateBadge: React.FC<StateProps> = ({ plan }) => {
  const { t } = useTranslation('billing');
  const [license, updateLicense] = useLicenseStore((state) => [state.license, state.updateLicense], shallow);
  const [loading, requestCancelUnsubscribePlan] = useRequest(cancelUnsubscribePlan);
  const updateGroupType = useBillingPlanPurchaseStore((state) => state.updateBillingGroupType);
  const [isOpen, openModal, closeModal] = useModal();

  const clickCancelUnsubscribe = async () => {
    if (!license) {
      return null;
    }

    if (plan.state === 'unsubscribed') {
      const groupType = BillingSubscriptionGroupType.find((group) => BillingPlanGroupMap[group].includes(plan.type));
      updateGroupType(groupType ?? null);
      openModal();
      return;
    }

    try {
      const rv = await requestCancelUnsubscribePlan(plan.billingPlanInfoId, {
        organizationId: license.organizationId,
      });

      if (rv.errorMessage || !rv.body) {
        sendErrorNotification(t('cancelUnsubscribeErrorMessage'));
        return;
      }

      updateLicense({
        ...license,
        billingOrganization: {
          ...license.billingOrganization,
          billingPlanInfos: [
            ...license.billingOrganization.billingPlanInfos.filter(
              (p) => p.billingPlanInfoId !== plan.billingPlanInfoId,
            ),
            rv.body,
          ],
        },
      });
      sendSuccessNotification(t('cancelUnsubscribeSuccessMessage'));
    } catch (e) {
      sendErrorNotification(t('cancelUnsubscribeErrorMessage'));
    }
  };

  switch (plan.state) {
    case 'subscribed':
    case 'change-option-or-period-requested':
      return (
        <div>
          <Tag color="green-inverse">{t('planStatusSubscribedText')}</Tag>
        </div>
      );
    case 'unsubscribe-requested':
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tag color="warning">{t('planStatusUnsubscribeRequestedText')}</Tag>
          <StyledCancelUnsubscribeButton onClick={clickCancelUnsubscribe} disabled={loading}>
            {t('planCancelUnsubscribeButtonText')}
          </StyledCancelUnsubscribeButton>

          <UpgradePlanModal isOpen={isOpen} close={closeModal} />
        </div>
      );
    case 'unsubscribed':
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tag color="error">{t('planStatusUnsubscribedText')}</Tag>
          <StyledCancelUnsubscribeButton onClick={clickCancelUnsubscribe} disabled={loading}>
            {t('planCancelUnsubscribeButtonText')}
          </StyledCancelUnsubscribeButton>

          <UpgradePlanModal isOpen={isOpen} close={closeModal} />
        </div>
      );
    default:
      assertUnreachable(plan.state);
  }
};

interface ItemProps {
  plan: BillingPlanInfoResponse;
}

const PlanItem: React.FC<ItemProps> = ({ plan }) => {
  const [license, updateLicense] = useLicenseStore((state) => [state.license, state.updateLicense], shallow);
  const [isOpen, openModal, closeModal] = useModal();
  const { t } = useTranslation('billing');

  const description = planDescriptionInfoMap[plan.type];
  const groupType = BillingSubscriptionGroupType.find((group) => BillingPlanGroupMap[group].includes(plan.type))!;

  const handleUnsubscribe = async () => {
    if (!license) {
      return;
    }

    try {
      const rv = await unsubscribePlan(plan.billingPlanInfoId, {
        organizationId: license.organizationId as string,
      });

      if (rv.errorMessage) {
        sendErrorNotification(t('cancelPlanErrorMessage'));
        return;
      }

      updateLicense({
        ...license,
        billingOrganization: {
          ...license.billingOrganization,
          billingPlanInfos: [
            ...license.billingOrganization.billingPlanInfos.filter(
              (p) => p.billingPlanInfoId !== plan.billingPlanInfoId,
            ),
            rv.body!,
          ],
        },
      });
      sendSuccessNotification(t('cancelPlanSuccessMessage'));
    } catch (e) {
      sendErrorNotification(t('cancelPlanErrorMessage'));
    }
  };

  const items: MenuProps['items'] = [
    license?.billingOrganization.billingMethod === 'paddle'
      ? {
          label: (
            <MenuItemButton danger={false} onClick={() => openModal()}>
              {t('paymentMethodButtonText')}
            </MenuItemButton>
          ),
          key: 'payment-method',
        }
      : null,
    {
      label: (
        <MenuItemButton
          danger
          onConfirm={handleUnsubscribe}
          modalTitle={t('cancelPlanModalTitle')}
          modalButtonTitle={t('cancelPlanModalConfirmButtonText')}
          modalContent={
            <div>
              <p>{t('cancelPlanModalDescription')}</p>
              <Alert
                style={{
                  marginTop: '.5rem',
                }}
                message={
                  <div>
                    Plan: <b>{t(description.titleI18nKey)}</b>{' '}
                    <span>
                      {`(${t(description.getOptionLabelI18nKey(plan.option), { option: plan.option })})`} /{' '}
                      {t(plan.period === 'yearly' ? 'monthCountPlural' : 'monthCountSingular', {
                        month: plan.period === 'yearly' ? 12 : 1,
                      })}
                    </span>
                  </div>
                }
                type="error"
              />
            </div>
          }
          disabled={plan.state === 'unsubscribed' || plan.state === 'unsubscribe-requested'}
        >
          {t('cancelPlanButtonText')}
        </MenuItemButton>
      ),
      key: 'cancel',
    },
  ];

  return (
    <>
      <Item>
        <ItemInner>
          <Cell flex={1}>
            <b>
              [{t(groupTypeI18nKeyMap[groupType])}] {t(description.titleI18nKey)}
            </b>
          </Cell>
          <Cell flex={1}>
            <PlanOption plan={plan} />
          </Cell>
          <Cell flex={1}>
            <StateBadge plan={plan} />
          </Cell>
          <Cell flex={1}>
            <NextCharge plan={plan} />
          </Cell>
          <ButtonWrapper>
            <MenuButton menu={{ items }} />
          </ButtonWrapper>
        </ItemInner>
      </Item>

      <Modal open={isOpen} centered footer={null} closable onCancel={closeModal} title={t('paymentMethodModalTitle')}>
        <BillingPaymentMethodPaddle plan={plan} />
      </Modal>
    </>
  );
};

interface Props {}

const BillingSubscribedPlanList: React.FC<Props> = () => {
  const { t } = useTranslation('billing');
  const license = useLicenseStore((state) => state.license);

  if (process.env.NEXT_PUBLIC_ENV === 'self-hosted') {
    return <div>Self hosted billing</div>;
  }

  const cloudLicense = license as CloudLicenseResponse;
  const subscribedPlans = cloudLicense.billingOrganization?.billingPlanInfos;
  const sortedSubscribedPlans = sort((a, b) => {
    const aGropuType = BillingSubscriptionGroupType.find((group) => BillingPlanGroupMap[group].includes(a.type))!;
    const bGropuType = BillingSubscriptionGroupType.find((group) => BillingPlanGroupMap[group].includes(b.type))!;

    return groupTypeSortMap[aGropuType] - groupTypeSortMap[bGropuType];
  }, subscribedPlans);

  if (!subscribedPlans || subscribedPlans.length === 0) {
    return (
      <Alert
        type="info"
        message={
          <p>
            Your organization is using <b style={{ fontWeight: '600' }}>Free plan</b>.
          </p>
        }
      />
    );
  }

  return (
    <>
      <Header>
        <ItemInner>
          <Cell flex={1}>{t('planNameColumnText')}</Cell>
          <Cell flex={1}>{t('planOptionColumnText')}</Cell>
          <Cell flex={1}>{t('planStatusColumnText')}</Cell>
          <Cell flex={1}>{t('planNextChargeDateColumnText')}</Cell>
          <ButtonWrapper />
        </ItemInner>
      </Header>
      <List
        dataSource={sortedSubscribedPlans}
        renderItem={(plan) => <PlanItem plan={plan} />}
        rowKey={(plan) => plan.billingPlanInfoId}
      />
    </>
  );
};

export default BillingSubscribedPlanList;

const Item = styled(List.Item)`
  ${listItemStyle}
`;

const Header = styled.div`
  ${tableHeaderStyle}
`;

const ItemInner = styled.div`
  ${flexRowBaseStyle}
`;

const Cell = styled.div<{ flex: number }>`
  ${tableCellStyle}
  flex: ${(props) => props.flex};
`;

const ButtonWrapper = styled.div`
  width: 48px;
  display: flex;
  justify-content: flex-end;
`;

const StyledCancelUnsubscribeButton = styled.button`
  padding: 0.25rem;
  background-color: transparent;
  font-size: 0.8rem;
  text-decoration: underline;
  color: ${(props) => props.theme.colorPrimary};
`;

const ChangeRequestedOptionText = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.main.colors.gray3};

  b {
    font-weight: 600;
  }
`;

const CancelChangeOptionButton = styled.button`
  margin-right: 0.4rem;
  background-color: transparent;
  font-size: 0.8rem;
  text-decoration: underline;
  color: ${(props) => props.theme.colorPrimary};
`;

import { ArrowRightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';

import useAuthStore from '../../stores/auth';
import useLicenseStore from '../../stores/license';
import { hasAdminPermission } from '../../utils/auth';
import { isMobileGameTestAutomationFreePlan } from '../../utils/billing';
import UpgradePlanButton from './UpgradePlanButton';

interface Props {}

const MobileGameTestAutomationFreeTierTopBanner: React.FC<Props> = () => {
  const license = useLicenseStore((state) => state.license);
  const me = useAuthStore((state) => state.me);
  const { t } = useTranslation('billing');

  if (!license) {
    return null;
  }

  const isFreePlan = isMobileGameTestAutomationFreePlan(license);
  const remainingSeconds =
    license.mobileGameTestAutomationRemainingFreeSeconds < 0 ? 0 : license.mobileGameTestAutomationRemainingFreeSeconds;

  if (isFreePlan) {
    return (
      <Box>
        <span style={{ fontSize: '.85rem' }}>
          <ClockCircleOutlined /> {Math.floor(remainingSeconds / 60).toFixed(0)} min{remainingSeconds > 1 ? 's' : ''}{' '}
          left(Cloud device).
        </span>
        {!!me && hasAdminPermission(me) && (
          <StyledButton type="ghost" groupType="mobile-game-test-automation-group">
            {t('upgradePlanButtonTitle')} <ArrowRightOutlined />
          </StyledButton>
        )}
      </Box>
    );
  }

  return null;
};

export default MobileGameTestAutomationFreeTierTopBanner;

const Box = styled.div`
  margin-left: 0.5rem;
  padding: 0 0.25rem;
  border-radius: 4px;
  background-color: #e6f4ff;
  border: 1px solid #91d5ff;
`;

const StyledButton = styled(UpgradePlanButton)`
  margin-left: 0.25rem;
  padding: 0 0.25rem;
  color: ${(props) => props.theme.main.colors.blue4};
`;

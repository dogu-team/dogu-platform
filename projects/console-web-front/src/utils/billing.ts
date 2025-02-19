import {
  BillingHistoryBase,
  BillingMethod,
  BillingPeriod,
  BillingPlanHistoryBase,
  BillingPlanInfoBase,
  BillingPlanType,
  CloudLicenseBase,
  CloudLicenseResponse,
  RegisterCardDto,
} from '@dogu-private/console';
import { BillingMethodRegistrationFormValues } from '../components/billing/BillingMethodRegistrationForm';
import { SelectedPlan } from '../stores/billing-plan-purchase';

export const getSubscriptionPlansFromLicense = (
  license: CloudLicenseBase,
  planTypes: BillingPlanType[] | null,
): BillingPlanInfoBase[] => {
  if ('licenseKey' in license) {
    const selfHostedLicense = license;
    return [];
  } else {
    const cloudLicense = license;
    const usingPlans = cloudLicense.billingOrganization?.billingPlanInfos?.filter(
      (plan) => plan.state !== 'unsubscribed',
    );

    if (planTypes) {
      return usingPlans?.filter((plan) => planTypes.includes(plan.type)) || [];
    }

    return usingPlans ?? [];
  }
};

export const parseNicePaymentMethodFormValues = (values: BillingMethodRegistrationFormValues): RegisterCardDto => {
  return {
    cardNumber: values.card.replaceAll(' ', ''),
    expirationMonth: values.expiry.split(' / ')[0],
    expirationYear: values.expiry.split(' / ')[1],
    idNumber: values.legalNumber,
    cardPasswordFirst2Digits: values.password,
  };
};

export const isLiveTestingFreePlan = (license: CloudLicenseResponse): boolean => {
  const liveTestingPlan = getSubscriptionPlansFromLicense(license, ['live-testing']);

  return liveTestingPlan.length === 0;
};

export const isWebTestAutomationFreePlan = (license: CloudLicenseResponse): boolean => {
  const webTestAutomationPlan = getSubscriptionPlansFromLicense(license, ['web-test-automation']);

  return webTestAutomationPlan.length === 0;
};

export const isMobileAppTestAutomationFreePlan = (license: CloudLicenseResponse): boolean => {
  const mobileAppTestAutomationPlan = getSubscriptionPlansFromLicense(license, ['mobile-app-test-automation']);

  return mobileAppTestAutomationPlan.length === 0;
};

export const isMobileGameTestAutomationFreePlan = (license: CloudLicenseResponse): boolean => {
  const mobileGameTestAutomationPlan = getSubscriptionPlansFromLicense(license, ['mobile-game-test-automation']);

  return mobileGameTestAutomationPlan.length === 0;
};

type SelectedPlanWithPeriod = SelectedPlan & { period: BillingPeriod };

export const checkShouldPurchase = (license: CloudLicenseResponse, plan: SelectedPlanWithPeriod): boolean => {
  const usingPlans = getSubscriptionPlansFromLicense(license, [plan.type]);

  if (!usingPlans.length) {
    return true;
  }

  const usingPlan = usingPlans[0];

  if (usingPlan.period === 'monthly') {
    if (usingPlan.option < plan.option) {
      return true;
    } else if (usingPlan.option > plan.option) {
      return false;
    } else {
      if (plan.period === 'yearly') {
        return true;
      }

      return false;
    }
  } else {
    if (usingPlan.option < plan.option) {
      if (plan.period === 'yearly') {
        return true;
      }

      return false;
    } else if (usingPlan.option > plan.option) {
      return false;
    } else {
      return false;
    }
  }
};

export const getHistoryAmount = (history: BillingHistoryBase | BillingPlanHistoryBase): number => {
  if (history.purchasedAmount !== null) {
    return history.purchasedAmount;
  }

  return history.refundedAmount !== null ? -history.refundedAmount : 0;
};

export const getPaymentMethodFromLicense = (
  routerLocale: string = 'en',
  license: CloudLicenseResponse,
): BillingMethod => {
  if (license.billingOrganization.billingMethod) {
    return license.billingOrganization.billingMethod;
  }

  return routerLocale === 'ko' ? 'nice' : 'paddle';
};

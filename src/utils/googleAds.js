
// Google Ads Conversion Tracking
export const trackGoogleAdsConversion = (conversionId, conversionLabel) => {
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `${conversionId}/${conversionLabel}`,
      'event_callback': function() {}
    });
  }
};

// Replace these with your actual conversion IDs/labels from Google Ads
export const GOOGLE_ADS_CONFIG = {
  customerId: 'AW-17463658663',
  phoneConversionLabel: 'REPLACE_WITH_PHONE_CONVERSION_LABEL', // e.g., 'XXXXXXXXXX'
  whatsappConversionLabel: 'REPLACE_WITH_WHATSAPP_CONVERSION_LABEL', // e.g., 'YYYYYYYYYY'
};

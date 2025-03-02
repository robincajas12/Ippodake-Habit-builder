import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9679713412722657/5646158476';
export default function MiBannerAd()
{
    return <BannerAd
    unitId={adUnitId}
    size={BannerAdSize.FULL_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}
  />
}
package com.tindop;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dooboolab.RNIap.RNIapPackage;
import com.horcrux.svg.SvgPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.magus.fblogin.FacebookLoginPackage;

import com.proyecto26.inappbrowser.RNInAppBrowserPackage;

import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import android.content.pm.PackageManager ;
import android.content.pm.PackageInfo ;
import android.content.pm.Signature;
import java.security.MessageDigest;
import android.util.Base64;
import android.util.Log;
import java.security.NoSuchAlgorithmException;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNIapPackage(),
            new SvgPackage(),
            new RNNetworkInfoPackage(),
            new ReactNativeOneSignalPackage(),
            new SplashScreenReactPackage(),
            new FastImageViewPackage(),
            new FacebookLoginPackage(),
            new RNInAppBrowserPackage(),
            new ImageResizerPackage(),
            new RNI18nPackage(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new MapsPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

 @Override
  public void onCreate() {
    super.onCreate();
    try {
      PackageInfo info = getPackageManager().getPackageInfo(
              "com.tindop",
              PackageManager.GET_SIGNATURES);
      for (Signature signature : info.signatures) {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
      }
    } catch (PackageManager.NameNotFoundException e) {

    } catch (NoSuchAlgorithmException e) {

    }

    SoLoader.init(this, /* native exopackage */ false);
  } 
}

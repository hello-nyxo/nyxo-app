package fi.nyxo.app;

import android.app.Application;

import com.facebook.react.PackageList;
import android.content.Context;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import fi.nyxo.app.generated.BasePackageList;
import io.sentry.RNSentryPackage;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;
import fi.nyxo.app.R;
import com.reactnative.googlefit.GoogleFitPackage;
import io.intercom.android.sdk.Intercom;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Arrays;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; 
import com.reactnativeultimateconfig.UltimateConfigModule;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
      new BasePackageList().getPackageList(), Arrays.<SingletonModule>asList());

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      // return true;
      return BuildConfig.DEBUG;
      // return BuildConfig.DEBUG; THERES something wrong here
    }

    @Override
    protected List<ReactPackage> getPackages() {

      List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(new ModuleRegistryAdapter(mModuleRegistryProvider));

      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // packages.add(new CodePush("Y26psKSBIfzb2ta6JgrEC_ZXlxeIHJ4jvmmMB",
      // getApplicationContext(), BuildConfig.DEBUG));
      // packages.add(new RNBackgroundFetchPackage());
      packages.add(new GoogleFitPackage(BuildConfig.APPLICATION_ID));
      packages.add(new ModuleRegistryAdapter(mModuleRegistryProvider));
      packages.add(new RNFirebaseMessagingPackage()); // <-- Add this line
      packages.add(new RNFirebaseNotificationsPackage()); // <-- Add this line
      // packages.add(new RNSentryPackage());

      // packages.add(new GFPackage());
      // packages.addAll(unimodules);

      // packages.add(new IntercomPackage());
      // Packages that cannot be autolinked yet can be added manually here, for
      // example: Y26psKSBIfzb2ta6JgrEC_ZXlxeIHJ4jvmmMB
      // packages.add(new MyReactNativePackage());
      return packages;

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
		UltimateConfigModule.setBuildConfig(BuildConfig.class);
    SoLoader.init(this, /* native exopackage */ false);
    Intercom.initialize(this, BuildConfig.INTERCOM_KEY_ANDROID, BuildConfig.INTERCOM_ID);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper, since
         * Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class).invoke(null, context,
            reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}

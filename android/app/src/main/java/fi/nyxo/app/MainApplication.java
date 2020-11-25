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
import io.sentry.react.RNSentryPackage;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;
import fi.nyxo.app.R;
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
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(new ModuleRegistryAdapter(mModuleRegistryProvider));

      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new ModuleRegistryAdapter(mModuleRegistryProvider));
      packages.add(new RNFirebaseMessagingPackage()); 
      packages.add(new RNFirebaseNotificationsPackage()); 
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

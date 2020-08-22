package fi.nyxo.app;

import android.os.Bundle;
import com.facebook.react.ReactFragmentActivity;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactFragmentActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this); // here
        super.onCreate(null);
    }

    @Override
    protected String getMainComponentName() {
        return "Nyxo";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}

import "styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/modules/layout";
import { DataProvider } from "@/lib/hooks/use-data-context";

// Define an interface for components that have a getLayout property
interface ComponentWithLayout {
  getLayout?: (component: JSX.Element) => JSX.Element;
}

// Extend the NextComponentType with new interface
type ExtendedAppProps = AppProps & {
  Component: React.ComponentType & ComponentWithLayout;
};

const MyApp = ({ Component, pageProps }: ExtendedAppProps) => {
  return (
    <DataProvider>
      <RootLayout>
        <Component {...pageProps} />;
      </RootLayout>
    </DataProvider>
  );
};

export default MyApp;

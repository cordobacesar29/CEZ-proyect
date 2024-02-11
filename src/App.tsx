import { CircularProgress } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/ROUTES";
import { Layout } from "./components/feature/Layout";
import { SessionProvider } from "./provider/SessionProvider";

function App() {
  return (
    <SessionProvider>
      <Suspense fallback={<CircularProgress isIndeterminate />}>
        <Routes>
          {/* LOGIN ROUTE */}
          <Route path={ROUTES.LOGIN} element={<LoginLazy />} />
          <Route path="/" element={<Layout />}>
            {/* Home ROUTE */}
            <Route path={ROUTES.HOME} element={<HomeLazy />} />
            {/* REGISTER ROUTE */}
            <Route path={ROUTES.REGISTER} />
            {/* CLIENT ROUTE */}
            <Route path={ROUTES.CLAIM_FORM} element={<ClaimFormLazy />} />
            {/* CLAIM LIST ROUTE */}
            <Route path={ROUTES.CLAIM_LIST} element={<ClaimListLazy />} />
            {/* CLAIM DETAIL ROUTE */}
            <Route path={ROUTES.CLAIM_DETAIL} />
          </Route>
        </Routes>
      </Suspense>
    </SessionProvider>
  );
}

export default App;

const HomeLazy = lazy(() =>
  import("./pages/home").then((el) => ({ default: el.Home }))
);
const ClaimFormLazy = lazy(() =>
  import("./pages/claim-form").then((el) => ({ default: el.ClaimForm }))
);

const LoginLazy = lazy(() =>
  import("./pages/login").then((el) => ({ default: el.Login }))
);
const ClaimListLazy = lazy(() =>
  import("./pages/claim-list").then((el) => ({ default: el.ClaimList }))
);

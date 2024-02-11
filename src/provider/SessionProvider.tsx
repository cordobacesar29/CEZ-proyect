import { useState } from "react";
import { IUser, IUserType } from "../constants/user.type";
import { INITIAL_USER, SessionContext } from "../context/SessionContext";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/ROUTES";
interface Props {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const UsersRef = collection(db, "Users");
  const navigate = useNavigate();
  const handleSetUser = async () => {};

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { user: userSession } = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const usersArray = (await getDocs(UsersRef)).docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as IUser;
    });

    const isAuth = usersArray.find((el) => el.email === userSession.email);

    if (!isAuth) return;
    setUser(isAuth as IUser);
    setIsAuthenticated(true);
    if (isAuth.user_type === IUserType.ADMIN)
      return navigate(ROUTES.CLAIM_LIST);
    if (isAuth.user_type === IUserType.OPERATOR) return navigate(ROUTES.HOME);
  };

  const handleSignOut = async () => {
    return console.log("hola");
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        handleSetUser,
        handleSignOut,
        login,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

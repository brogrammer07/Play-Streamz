import { Dispatch, SetStateAction, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Input from "../../input/Input";
import Button from "../../button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useUserAuth } from "../../../context/userAuthContext";

import ErrorText from "../../input/ErrorText";
type SignInModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
type LoginProps = {
  setLogin: Dispatch<SetStateAction<boolean>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

type SignUpProps = {
  setLogin: Dispatch<SetStateAction<boolean>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setLogin, setOpenModal }) => {
  const { loginUser } = useUserAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<{
    email: boolean;
    password: boolean;
    default: boolean;
  }>({ email: false, password: false, default: false });
  const [loginForm, setLoginForm] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleChange = (id: string, value: string) => {
    setLoginForm({ ...loginForm, [id]: value });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormError({ email: false, password: false, default: false });
    loginUser(loginForm.email, loginForm.password)
      .then(() => setOpenModal(false))
      .catch((error) => {
        let errorCode = error.code;
        console.log(errorCode);

        if (
          errorCode.split("/")[1] === "wrong-password" ||
          errorCode.split("/")[1] === "user-not-found" ||
          errorCode.split("/")[1] === "too-many-requests"
        ) {
          if (errorCode.split("/")[1] === "user-not-found")
            setFormError({ ...formError, email: true });
          else if (errorCode.split("/")[1] === "wrong-password")
            setFormError({ ...formError, password: true });
          else if (errorCode.split("/")[1] === "too-many-requests")
            setFormError({ ...formError, default: true });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(formError);

  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div className="flex flex-col space-y-[10px] w-full">
        <div className="flex flex-col items-center space-y-[47px] w-full">
          <h3 className="text-neutral-300">Log in to your account</h3>
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-full space-y-[18px] "
          >
            <div className="flex flex-col space-y-2">
              <Input
                title={"Email"}
                handleChange={handleChange}
                id="email"
                placeholder="Enter email"
                type="email"
                value={loginForm.email}
                error={formError.email}
              />
              {formError.email && <ErrorText text="User doesn't exist" />}
            </div>
            <div className="flex flex-col space-y-2">
              <Input
                title={"Password"}
                handleChange={handleChange}
                id="password"
                placeholder="Enter password"
                type="password"
                value={loginForm.password}
                error={formError.password}
              />
              {formError.password && <ErrorText text="Invalid password" />}
              {formError.default && (
                <ErrorText text="Too many attempts made! Please try again later" />
              )}
            </div>
            <Button loading={loading} title="Log in" type="solid" />
          </form>
        </div>
        <p className="l1-r text-neutral-800 text-center">Or</p>
        <Button
          title="Continue with Google"
          type="solid"
          accent="white"
          icon={<img src="/assets/icons/icon_Google.png" />}
        />
      </div>

      <p className="p2-r text-neutral-300">
        Don't have an account?{" "}
        <span
          onClick={() => setLogin(false)}
          className="text-primary-900 cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

const SignUp: React.FC<SignUpProps> = ({ setLogin, setOpenModal }) => {
  const { signUpUser, currentUser } = useUserAuth();
  const [signUpForm, setSignUpForm] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({ email: "", password: "", name: "", confirmPassword: "" });
  const handleChange = (id: string, value: string) => {
    setSignUpForm({ ...signUpForm, [id]: value });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpForm.password === signUpForm.confirmPassword) {
      signUpUser(signUpForm.email, signUpForm.password, signUpForm.name).then(
        () => setOpenModal(false)
      );
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div className="flex flex-col space-y-[10px] w-full">
        <div className="flex flex-col items-center space-y-[47px] w-full">
          <h3 className="text-neutral-300">Create an account</h3>
          <form
            onSubmit={handleSignUp}
            className="flex flex-col w-full space-y-[18px] "
          >
            <Input
              title={"Name"}
              id="name"
              placeholder="Enter name"
              type="text"
              value={signUpForm.name}
              handleChange={handleChange}
            />
            <Input
              title={"Email"}
              id="email"
              placeholder="Enter email"
              type="email"
              value={signUpForm.email}
              handleChange={handleChange}
            />
            <Input
              title={"Password"}
              id="password"
              placeholder="Enter password"
              type="password"
              value={signUpForm.password}
              handleChange={handleChange}
            />
            <Input
              title={"Confirm Password"}
              id="confirmPassword"
              placeholder="Enter confirm password"
              type="password"
              value={signUpForm.confirmPassword}
              handleChange={handleChange}
            />
            <Button buttonAction="submit" title="Sign up" type="solid" />
          </form>
        </div>
        <p className="l1-r text-neutral-800 text-center">Or</p>
        <Button
          title="Continue with Google"
          type="solid"
          accent="white"
          icon={<img src="/assets/icons/icon_Google.png" />}
        />
      </div>

      <p className="p2-r text-neutral-300">
        Already have an account?{" "}
        <span
          onClick={() => setLogin(true)}
          className="text-primary-900 cursor-pointer"
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

const SignInModal: React.FC<SignInModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [login, setLogin] = useState(false);
  return (
    <Modal
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Fade in={openModal}>
        <div className="h-[668px] w-[696px] bg-black-800 border-black-700 border-[1px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col py-[20px] px-[22px]">
          <div
            onClick={() => setOpenModal(false)}
            className="text-neutral-400 self-end cursor-pointer"
          >
            <CloseOutlinedIcon />
          </div>
          <div className="pt-[10px] px-[106px] h-full">
            {login ? (
              <Login setOpenModal={setOpenModal} setLogin={setLogin} />
            ) : (
              <SignUp setOpenModal={setOpenModal} setLogin={setLogin} />
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SignInModal;

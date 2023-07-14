import { Dispatch, SetStateAction, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Input from "../../input";
import Button from "../../button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
type SignInModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
type LoginProps = {
  setLogin: Dispatch<SetStateAction<boolean>>;
};

type SignUpProps = {
  setLogin: Dispatch<SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div className="flex flex-col space-y-[10px] w-full">
        <div className="flex flex-col items-center space-y-[47px] w-full">
          <h3 className="text-neutral-300">Log in to your account</h3>
          <div className="flex flex-col w-full space-y-[18px] ">
            <Input
              setValue={setEmail}
              title={"Email"}
              placeholder="Enter email"
              type="email"
              value={email}
            />
            <Input
              setValue={setPassword}
              title={"Password"}
              placeholder="Enter password"
              type="password"
              value={password}
            />
            <Button title="Log in" type="solid" />
          </div>
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

const SignUp: React.FC<SignUpProps> = ({ setLogin }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div className="flex flex-col space-y-[10px] w-full">
        <div className="flex flex-col items-center space-y-[47px] w-full">
          <h3 className="text-neutral-300">Create an account</h3>
          <div className="flex flex-col w-full space-y-[18px] ">
            <Input
              setValue={setName}
              title={"Name"}
              placeholder="Enter name"
              type="text"
              value={name}
            />
            <Input
              setValue={setEmail}
              title={"Email"}
              placeholder="Enter email"
              type="email"
              value={email}
            />
            <Input
              setValue={setPassword}
              title={"Password"}
              placeholder="Enter password"
              type="password"
              value={password}
            />
            <Input
              setValue={setConfirmPassword}
              title={"Confirm Password"}
              placeholder="Enter confirm password"
              type="password"
              value={confirmPassword}
            />
            <Button title="Sign in" type="solid" />
          </div>
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
              <Login setLogin={setLogin} />
            ) : (
              <SignUp setLogin={setLogin} />
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SignInModal;

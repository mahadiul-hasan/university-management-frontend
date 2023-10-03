"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { isLoggedIn, storeUserInfo } from "@/services/auth.service";
import { Button, message, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
	<LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

type FormValues = {
	id: string;
	password: string;
};

const LoginForm = () => {
	const router = useRouter();
	const [userLogin, { isLoading }] = useUserLoginMutation();

	const userLoggedIn = isLoggedIn();

	useEffect(() => {
		if (userLoggedIn) {
			router.push("/profile");
		}
	}, [userLoggedIn, router]);

	const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
		try {
			const res = await userLogin({ ...data }).unwrap();
			if (res?.data?.accessToken) {
				router.push("/profile");
			}
			message.success(res.message);
			storeUserInfo({ accessToken: res?.data?.accessToken });
		} catch (error: any) {
			message.error(error?.data?.errorMessages[0]?.message);
		}
	};
	return (
		<>
			<h1 style={{ margin: "15px 0" }}>First Login Your Account</h1>
			<div>
				<Form submitHandler={onSubmit}>
					<div>
						<FormInput
							name="id"
							type="text"
							size="large"
							placeholder="Enter Your id"
							label="User ID"
						/>
					</div>
					<div style={{ margin: "15px 0" }}>
						<FormInput
							name="password"
							type="password"
							size="large"
							placeholder="Enter Your password"
							label="User Password"
						/>
					</div>
					<Button type="primary" htmlType="submit">
						{isLoading ? <Spin indicator={antIcon} /> : "Login"}
					</Button>
				</Form>
			</div>
		</>
	);
};

export default LoginForm;

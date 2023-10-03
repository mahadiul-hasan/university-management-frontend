"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddDepartmentMutation } from "@/redux/api/departmentApi";
import { departmentSchema } from "@/schemas/department";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
	<LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

type FormValues = {
	title: string;
};

const CreateDepartmentPage = () => {
	const { role } = getUserInfo() as any;
	const router = useRouter();

	const [addDepartment, { isLoading }] = useAddDepartmentMutation();

	const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
		try {
			const res = await addDepartment(data).unwrap();
			message.success(res?.message);
			router.push("/super_admin/department");
		} catch (error: any) {
			message.error(error?.data?.errorMessages[0]?.message);
		}
	};

	return (
		<div>
			<UMBreadCrumb
				items={[
					{ label: `${role}`, link: `/${role}` },
					{
						label: `department`,
						link: `/${role}/department`,
					},
				]}
			/>
			<h1 style={{ textAlign: "center", margin: "1rem 0" }}>
				Change Password
			</h1>
			<Form
				submitHandler={onSubmit}
				resolver={yupResolver(departmentSchema)}
			>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: "10px 0" }}>
						<FormInput
							name="title"
							type="text"
							size="large"
							placeholder="Enter Department Title"
							label="Management Department Title"
						/>
					</Col>
				</Row>
				<Button type="primary" htmlType="submit">
					{isLoading ? (
						<Spin indicator={antIcon} />
					) : (
						"Create Department"
					)}
				</Button>
			</Form>
		</div>
	);
};

export default CreateDepartmentPage;

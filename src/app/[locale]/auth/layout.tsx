import AuthLayout from "@/components/layouts/auth-layout/auth-layout";

export default async function LoginRegisterLayoutContainer(props: {
  children: React.ReactNode;
}) {
  const { children } = props;

  return <AuthLayout>{children}</AuthLayout>;
}

import MainLayout from "@/components/layouts/main-layout/main-layout";

export default async function MainLayoutContainer(props: { children: React.ReactNode }) {
  const { children } = props;
  return <MainLayout>{children}</MainLayout>;
}

import ControlPanelLayout from "@/components/layouts/control-panel-layout/control-panel-layout";
import MainLayout from "@/components/layouts/main-layout/main-layout";

export default async function ControlPanelLayoutContainer(props: { children: React.ReactNode }) {
  const { children } = props;
  return <ControlPanelLayout>{children}</ControlPanelLayout>;
}

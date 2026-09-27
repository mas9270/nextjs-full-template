export default function ControlPanelLayout(props: {
  children: React.ReactNode;
}) {
  const { children } = props;
  return <div className="w-full flex-1 flex flex-col">{children}</div>;
}

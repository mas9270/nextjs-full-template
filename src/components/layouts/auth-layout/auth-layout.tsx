export default function AuthLayout(props: {
  children: React.ReactNode;
}) {
  const { children } = props;
  return <div className="w-full h-full flex flex-col">{children}</div>;
}

export default function Main(props: { children: React.ReactNode }) {
  const { children } = props;
  return <main className="w-full flex-1">{children}</main>;
}

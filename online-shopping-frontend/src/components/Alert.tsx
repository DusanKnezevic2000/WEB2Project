interface Props {
  color: string;
  status: string;
}

function Alert({ color, status }: Props) {
  return (
    <>
      <div className={"alert " + color}>{status}</div>
    </>
  );
}

export default Alert;

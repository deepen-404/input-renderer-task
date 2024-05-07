const ErrorText = ({ error }: { error: string[] }) => {
  if (error.length > 0) {
    return (
      <div style={{ color: "red" }}>
        {error.map((err) => (
          <p key={err} className="text-red-500">
            {err}
          </p>
        ))}
      </div>
    );
  }
  return;
};

export default ErrorText;

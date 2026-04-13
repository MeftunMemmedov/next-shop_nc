const Spinner = ({ size = 60 }: { size?: number }) => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="spinner" style={{ width: size, height: size }}></div>
    </div>
  );
};

export default Spinner;

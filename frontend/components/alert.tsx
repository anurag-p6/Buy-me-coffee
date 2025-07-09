type AlertProps = {
  message: string;
  display: 'none' | 'block';
};

export const Alert = ({ message, display }: AlertProps) => {
  return (
   <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white text-red-500 px-3 py-2 md:px-8 md:py-6 text-[5px] md:text-base rounded-lg shadow-lg transition-opacity duration-300 transparency-80`}
      style={{ display }}
    >
    {message}
    </div>
  );
};

interface HeadingProps {
  title: string;
}

export const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div>
      <h2 className=" ml-4 text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
};

import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="mr-8 ml-8 pl-6 pb-8 rounded-xl relative aspect-[3.5/1]  bg-cover"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;

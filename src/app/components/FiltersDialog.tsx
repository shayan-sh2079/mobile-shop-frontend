import DialogWrapper from "@/common/components/DialogWrapper";
import Filters from "@/app/components/Filters";

type Props = {
  onClose: () => void;
  price: { min: number; max: number };
};

const FiltersDialog = (props: Props) => {
  return (
    <DialogWrapper title={"Filters"} onClose={props.onClose}>
      <div className={"px-4"}>
        <Filters price={props.price} />
      </div>
    </DialogWrapper>
  );
};

export default FiltersDialog;

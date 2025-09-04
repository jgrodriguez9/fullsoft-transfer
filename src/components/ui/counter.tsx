import { cn } from "@/libs/utils";
import { CounterProps } from "../controllers/dropdown/types";
import CounterCore from "./counter-core";

const Counter: React.FC<CounterProps> = (props) => {
  if (props.label === undefined) {
    return <CounterCore {...props} />;
  }

  return (
    <div
      className={cn("flex w-full items-center gap-2.5 p-3", props.className)}
    >
      {/* Label */}
      <div className={cn("flex flex-1 flex-col items-start")}>
        <span
          className={cn(
            "text-neutrals-black text-sm leading-[150%] font-semibold",
            props.classNameLabel
          )}
        >
          {props.label}
        </span>

        {props.subLabel !== undefined && (
          <small
            className={cn(
              "text-neutrals-dark-grey text-sm leading-[150%] font-normal",
              props.classNameSubLabel
            )}
          >
            {props.subLabel}
          </small>
        )}
      </div>

      <CounterCore {...props} />
    </div>
  );
};

export default Counter;

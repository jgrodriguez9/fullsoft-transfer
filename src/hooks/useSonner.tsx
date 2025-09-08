import { ERROR_SERVER } from "@/constant/messages";
import { extractMeaningfulMessage } from "@/libs/utils";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

const useSonner = () => {
  const simpleError = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (message: any) => {
      const mess = extractMeaningfulMessage(message, ERROR_SERVER);
      toast.error(mess);
    },
    []
  );

  const simpleSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  const simpleWarning = useCallback((message: string) => {
    toast.warning(message);
  }, []);

  const simpleInfo = useCallback((message: string) => {
    toast.info(message);
  }, []);

  return useMemo(
    () => ({
      simpleError,
      simpleSuccess,
      simpleWarning,
      simpleInfo,
    }),
    [simpleError, simpleInfo, simpleSuccess, simpleWarning]
  );
};

export default useSonner;

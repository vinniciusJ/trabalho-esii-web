import { useCallback, useMemo } from "react";

import {
  MutationFunction,
  QueryKey,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Service } from "@/service";
import { eventosAPI } from "@/service/eventos";
import { toast } from "react-toastify";
import { useLoading } from "./loading";

interface Params {
  endpoint: string;
  invalidateQueries?: QueryKey[];
}

interface BaseMethodParams {
  successMessage?: string;
  customEnpoint?: string;
}

interface MethodParams<P> extends BaseMethodParams {
  body: P;
}

interface UpdateMethodParams<P> extends BaseMethodParams {
  body: P;
  id: string | number;
}

interface DeleteMethodParams extends BaseMethodParams {
  id: string | number;
}

interface SendFileMethodParams extends BaseMethodParams {
  file: File;
  fileName: string;
  id: string | number;
}

interface RemoveFileMethodParams extends BaseMethodParams {
  fileName: string;
  id: string | number;
}

export const useMutate = <T extends object, P extends object = object>({
  endpoint,
  invalidateQueries = []
}: Params) => {
  const service = new Service<T>(eventosAPI, endpoint);
  const queryClient = useQueryClient();
  const { startLoading, stopLoading } = useLoading();

  const onSuccess = useCallback(
    (_: unknown, { successMessage }: BaseMethodParams) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });

      for (const key of invalidateQueries)
        queryClient.invalidateQueries({ queryKey: key });

      successMessage && toast.success(successMessage);
    },
    [invalidateQueries]
  );

  const onError = useCallback(() => {
    stopLoading();
    toast.error("Ocorreu um erro na requisição");
  }, []);

  const createMutationFn: MutationFunction<
    AxiosResponse<T>,
    MethodParams<P>
  > = async ({ body, customEnpoint }) => {
    startLoading();
    const result = await service.create(body, customEnpoint);
    stopLoading();

    return result;
  };

  const { mutateAsync: create, isPending: isLoadingCreate } = useMutation({
    mutationFn: createMutationFn,
    onSuccess,
    onError
  });

  const patchMutationFn: MutationFunction<
    AxiosResponse<T>,
    MethodParams<P>
  > = async ({ body, customEnpoint }) => {
    startLoading();
    const result = await service.patch(body, customEnpoint);
    stopLoading();

    return result;
  };

  const { mutateAsync: patch, isPending: isLoadingPatch } = useMutation({
    mutationFn: patchMutationFn,
    onSuccess,
    onError
  });

  const updateMutationFn: MutationFunction<
    AxiosResponse<T>,
    UpdateMethodParams<P>
  > = async ({ body, id }) => {
    startLoading();
    const result = await service.update(id, body);
    stopLoading();

    return result;
  };

  const { mutateAsync: update, isPending: isLoadingUpdate } = useMutation({
    mutationFn: updateMutationFn,
    onSuccess,
    onError
  });

  const removeMutationFn: MutationFunction<void, DeleteMethodParams> = async ({
    id, customEnpoint
  }) => {
    startLoading();
    await service.delete(id, customEnpoint);
    stopLoading();
  };

  const { mutateAsync: remove, isPending: isLoadingRemove } = useMutation({
    mutationFn: removeMutationFn,
    onSuccess,
    onError
  });

  const sendFileMutationFn: MutationFunction<Blob, SendFileMethodParams> = ({
    file,
    fileName,
    id
  }: SendFileMethodParams) => {
    startLoading();
    const formData = new FormData();
    formData.append(fileName, file);

    const result = service.sendFile(
      formData,
      {},
      `${endpoint}/${id}/${fileName}`
    );
    stopLoading();

    return result;
  };

  const { mutateAsync: sendFile, isPending: isLoadingSendFile } = useMutation({
    mutationFn: sendFileMutationFn,
    onSuccess,
    onError
  });

  const removeFileMutationFn: MutationFunction<
    void,
    RemoveFileMethodParams
  > = async ({ id, fileName }) => {
    startLoading();
    await service.delete(id, `${endpoint}/${id}/${fileName}`);
    stopLoading();
  };

  const { mutateAsync: removeFile, isPending: isLoadingRemoveFile } =
    useMutation({
      mutationFn: removeFileMutationFn,
      onSuccess,
      onError
    });

  const isLoading = useMemo(
    () =>
      isLoadingCreate ||
      isLoadingUpdate ||
      isLoadingPatch ||
      isLoadingRemove ||
      isLoadingSendFile ||
      isLoadingRemoveFile,
    [
      isLoadingCreate,
      isLoadingUpdate,
      isLoadingPatch,
      isLoadingRemove,
      isLoadingSendFile,
      isLoadingRemoveFile
    ]
  );

  return {
    create,
    update,
    patch,
    sendFile,
    removeFile,
    remove,
    isLoading
  };
};

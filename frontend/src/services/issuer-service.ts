/*
 * Copyright (c) 2020-2022 - for information on the respective copyright owner
 * see the NOTICE file and/or the repository at
 * https://github.com/hyperledger-labs/business-partner-agent
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { appAxios } from "@/services/interceptors";
import { ApiRoutes, CredentialExchangeRoles } from "@/constants";
import {
  CreateCredDefRequest,
  SchemaApi,
  CreateSchemaRequest,
  CredentialOfferRequest,
  IssueCredentialRequest,
  IssueOobCredentialRequest,
  CredDef,
  ApiCreateInvitation,
  CredEx,
} from "@/services/types-services";
import { AxiosResponse } from "axios";

export default {
  //
  // Issuer API
  //
  createSchema(data: CreateSchemaRequest): Promise<AxiosResponse<SchemaApi>> {
    return appAxios().post(`${ApiRoutes.ISSUER}/schema`, data);
  },

  createCredDef(data: CreateCredDefRequest): Promise<AxiosResponse<CredDef>> {
    return appAxios().post(`${ApiRoutes.ISSUER}/creddef`, data);
  },

  deleteCredDef(id: string): Promise<AxiosResponse<void>> {
    return appAxios().delete(`${ApiRoutes.ISSUER}/creddef/${id}`);
  },

  listCredDefs(): Promise<AxiosResponse<CredDef[]>> {
    return appAxios().get(`${ApiRoutes.ISSUER}/creddef`);
  },

  issueCredentialSend(
    data: IssueCredentialRequest
  ): Promise<AxiosResponse<string>> {
    return appAxios().post(`${ApiRoutes.ISSUER}/issue-credential/send`, data);
  },

  /**
   * Issue OOB credential - prepares credential offer and returns URL for use within the barcode
   * @param data
   */
  issueOobCredentialOfferCreate(
    data: IssueOobCredentialRequest
  ): Promise<AxiosResponse<ApiCreateInvitation>> {
    return appAxios().post(
      `${ApiRoutes.ISSUER}/issue-credential/oob-attachment`,
      data
    );
  },

  listCredentialExchanges(id: string): Promise<AxiosResponse<CredEx[]>> {
    return appAxios().get(`${ApiRoutes.ISSUER}/exchanges`, {
      params: { partnerId: id },
    });
  },

  getCredExRecord(id: string): Promise<AxiosResponse<CredEx>> {
    return appAxios().get(`${ApiRoutes.ISSUER}/exchanges/${id}`);
  },

  listCredentialExchangesAsIssuer(
    id?: string
  ): Promise<AxiosResponse<CredEx[]>> {
    return appAxios().get(`${ApiRoutes.ISSUER}/exchanges`, {
      params: { role: CredentialExchangeRoles.ISSUER, partnerId: id },
    });
  },

  revokeCredential(id: string): Promise<AxiosResponse<CredEx>> {
    return appAxios().put(`${ApiRoutes.ISSUER}/exchanges/${id}/revoke`);
  },

  async declineCredentialProposal(
    id: string,
    reasonMessage: string
  ): Promise<AxiosResponse<void>> {
    const message =
      reasonMessage === undefined || "" ? undefined : reasonMessage;

    return appAxios().put(
      `${ApiRoutes.ISSUER}/exchanges/${id}/decline-proposal`,
      {
        message,
      }
    );
  },

  sendCredentialOffer(
    id: string,
    counterOfferData: CredentialOfferRequest
  ): Promise<AxiosResponse<CredEx>> {
    return appAxios().put(
      `${ApiRoutes.ISSUER}/exchanges/${id}/send-offer`,
      counterOfferData
    );
  },

  reIssueCredential(id: string): Promise<AxiosResponse<void>> {
    return appAxios().post(`${ApiRoutes.ISSUER}/exchanges/${id}/re-issue`);
  },
};

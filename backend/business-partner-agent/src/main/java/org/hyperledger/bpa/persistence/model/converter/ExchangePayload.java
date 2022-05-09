/*
 * Copyright (c) 2020-2022 - for information on the respective copyright owner
 * see the NOTICE file and/or the repository at
 * https://github.com/hyperledger-labs/business-partner-agent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.hyperledger.bpa.persistence.model.converter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hyperledger.bpa.api.CredentialType;
import org.hyperledger.bpa.persistence.model.type.ExchangeTypeTranslator;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangePayload<I, L> implements ExchangeTypeTranslator {

    private CredentialType type;
    private I indy;
    private L ldProof;

    public static <I, L> ExchangePayload<I, L> indy(I indy) {
        ExchangePayload.ExchangePayloadBuilder<I, L> b = ExchangePayload.builder();
        return b.indy(indy).type(CredentialType.INDY).build();
    }

    public static <I, L> ExchangePayload<I, L> jsonLD(L ldProof) {
        ExchangePayload.ExchangePayloadBuilder<I, L> b = ExchangePayload.builder();
        return b.ldProof(ldProof).type(CredentialType.JSON_LD).build();
    }
}

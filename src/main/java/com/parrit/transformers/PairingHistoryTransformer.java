package com.parrit.transformers;

import com.parrit.DTOs.PairingArrangementDTO;
import com.parrit.DTOs.PairingHistoryDTO;
import com.parrit.entities.PairingArrangement;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;

import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;
import static org.springframework.util.CollectionUtils.isEmpty;

public class PairingHistoryTransformer {

    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");

    static {
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
    }

    public static PairingArrangementDTO transform(PairingArrangement pairingHistory) {
        return PairingArrangementDTO.builder()
                .id(pairingHistory.getId())
                .pairingHistories(
                        pairingHistory.getPairingHistories().stream()
                                .map(history -> PairingHistoryDTO.builder()
                                        .pairingBoardName(history.getPairingBoardName())
                                        .people(PersonTransformer.transform(history.getPeople()))
                                        .build()
                                ).collect(toSet())
                )
                .pairingTime(simpleDateFormat.format(pairingHistory.getPairingTime()))
                .build();
    }

    public static List<PairingArrangementDTO> transform(List<PairingArrangement> pairingHistories) {
        if (isEmpty(pairingHistories)) return emptyList();
        return pairingHistories.stream()
                .map(PairingHistoryTransformer::transform)
                .collect(toList());
    }

}

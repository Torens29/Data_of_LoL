import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { MatchDetails } from '../MatchDetails/MatchDetails.js';
import type { MatchDTO } from '../../services/typesApi.js';
import { getDuration } from '../../utils/getDuration.js';

interface ModalProps {
    matchData: {
        id: string;
        info: MatchDTO | null;
    } | null;
    isModalOpen: boolean;
    closeModal: () => void;
}

export const Modal = ({ matchData, isModalOpen, closeModal } : ModalProps) => {
    return (
        <Dialog.Root
            placement={'center'}
            motionPreset="slide-in-bottom"
            open={isModalOpen}
            onOpenChange={closeModal}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content minWidth="1000px">
                        <Dialog.Header>
                            <Dialog.Title>
                                Детали матча {getDuration(matchData?.info?.info.gameDuration ?? 0)}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {isModalOpen && (
                                <MatchDetails matchData={matchData} />
                            )}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={closeModal} />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

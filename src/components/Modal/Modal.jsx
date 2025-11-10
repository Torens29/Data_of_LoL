import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { MatchDetails } from '../MatchDetails/MatchDetails';

export const Modal = ({ matchData, isModalOpen, closeModal }) => {
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
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Детали матча</Dialog.Title>
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

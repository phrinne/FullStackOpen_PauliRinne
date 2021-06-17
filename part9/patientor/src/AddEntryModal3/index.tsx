import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm3, { EntryForm3Values } from './AddEntryForm3';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryForm3Values) => void;
  error?: string;
}

const AddEntryModal3 = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry (Health Check)</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm3 onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal3;
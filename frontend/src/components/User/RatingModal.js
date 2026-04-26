import { Modal, Stack, Text, Group, Textarea, Button } from '@mantine/core';
import RatingStars from './RatingStars';

export default function RatingModal({ opened, onClose, store, rating, setRating, comment, setComment, onConfirm, loading }) {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={700}>Rate {store?.name}</Text>}
      centered
      radius="md"
    >
      <Stack>
        <Text size="sm" c="dimmed">How was your experience? Your feedback helps others.</Text>
        <Group justify="center" py="md">
          <RatingStars rating={rating} setRating={setRating} />
        </Group>
        <Textarea
          label="Write a Comment"
          placeholder="Share your experience (Optional)"
          minRows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button 
          fullWidth onClick={onConfirm} 
          loading={loading} disabled={rating === 0}
          color="blue" size="md" radius="md"
        >
          Confirm Rating
        </Button>
      </Stack>
    </Modal>
  );
}
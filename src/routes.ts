import { Router } from 'express';

const router = Router();

router.post('/users', (request, response) => {
  response.json({ message: 'Hello World' });
});

export { router };
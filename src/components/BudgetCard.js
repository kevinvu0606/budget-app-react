import { Card, ProgressBar } from 'react-bootstrap';
import { currencyFormatter } from '../util';
export default function BudgetCard({ name, amount, max }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-item-baseline fw-normal mb-3'>
          <div className='me-2'>{name}</div>
          <div className='d-flex align-item-baseline'>
            {currencyFormatter.format(amount)}
            <span className='text-muted fs-6 ms-1'>
              / {currencyFormatter.format(max)}
            </span>
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
import styles from './column.module.scss';
import { ElementState } from '../../types/element-states';

interface ColumnProps {
  index: number;
  state?: ElementState;
  extraClass?: string;
}

export const Column = ({ index, state = 'default', extraClass = '' }: ColumnProps) => (
  <div className={`${styles.content} ${extraClass}`}>
    <div
      className={`${styles.column} ${styles[state]}`}
      style={{ height: (320 * index) / 100 || 1 }}
    />
    <p className={`text text_type_column text_color_input mt-3`}>{index}</p>
  </div>
);

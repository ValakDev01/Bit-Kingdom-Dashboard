import './TableHeader.scss';

function TableHeader() {
  return (
    <header className='table-header'>
      <span className='cell'></span>
      <span className='cell'>#</span>
      <span className='cell'>Name</span>
      <span className='cell cell-right'>Price</span>
      <span className='cell cell-right'>1h %</span>
      <span className='cell cell-right'>24h %</span>
      <span className='cell cell-right'>7d %</span>
      <span className='cell cell-right separation'>Market Cap</span>
      <span className='cell cell-right'>Last 7 Days</span>
      <span className='cell cell-right'></span>
    </header>
  );
}

export default TableHeader;

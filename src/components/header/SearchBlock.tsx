import ButtonSearch from './ButtonSearch';
import InputBlock from './InputBlock';

function SearchBlock() {
  return (
    <div className="flex grow flex-row gap-4">
      <ButtonSearch />
      <InputBlock />
    </div>
  );
}

export default SearchBlock;

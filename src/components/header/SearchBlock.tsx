import ButtonSearch from './ButtonSearch';
import InputBlock from './inputSearch/InputBlock';

function SearchBlock({
  onFocusChangeAction,
}: {
  onFocusChangeAction: (focused: boolean) => void;
}) {
  return (
    <div className="flex grow flex-row gap-4">
      <ButtonSearch />
      <InputBlock onFocusChangeAction={onFocusChangeAction} />
    </div>
  );
}

export default SearchBlock;

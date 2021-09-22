import React, { useState } from 'react';
import styles from './style.module.css';

interface Tags {
  [index: string]: boolean;
}

interface TagInputProps {
  required: boolean;
  tags: Tags;
  setTags: React.Dispatch<React.SetStateAction<Tags>>;
  maxTags: number;
}

function TagInput({ required, tags, setTags, maxTags }: TagInputProps) {
  const [inputData, setInputData] = useState('');
  const tagsKeys = Object.keys(tags);

  return (
    <div style={{ position: 'relative' }}>
      <input
        style={{ paddingRight: '120px' }}
        className="input"
        type="text"
        required={required && tagsKeys.length === 0}
        value={inputData}
        data-testid="tag-input-box"
        onChange={(e) => {
          setInputData(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const addedTags = inputData
              .split(',')
              .map((word) => word.trim().replace(/\s+/g, ' '))
              .filter((word) => word && !tags[word])
              .reduce((obj, word) => ({ ...obj, [word]: true }), {});

            const newTags = { ...tags, ...addedTags };
            if (Object.keys(newTags).length > maxTags) {
              alert(`${maxTags}개까지만 입력 가능합니다.`);
              return;
            }

            setTags(newTags);
            setInputData('');
          }
        }}
      />
      <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
        <span className="content has-text-grey-light is-size-7">
          {tagsKeys.length} 개
        </span>
        &nbsp;
        <button
          className="button is-small is-danger"
          type="button"
          onClick={() => setTags({})}
        >
          전체 삭제
        </button>
      </div>
      <div
        className={styles.tags}
        role="button"
        data-testid="tag-container"
        tabIndex={0}
        onClick={(e) => {
          const target = e.target as HTMLSpanElement;
          if (target.tagName !== 'SPAN') return;

          const newTags = { ...tags };
          const tag = target.dataset.tag ?? '';
          delete newTags[tag];
          setTags(newTags);
        }}
      >
        {required && (tagsKeys.length === 0 || inputData.length > 0) && (
          <input
            type="checkbox"
            required
            onInvalid={(e) => {
              const target = e.target as HTMLInputElement;
              target.setCustomValidity('태그 작성 후, 엔터를 입력하세요.');
            }}
            style={{ position: 'absolute', opacity: 0 }}
          />
        )}
        {Object.keys(tags).map((tag) => (
          <span className={styles.tag} key={tag} data-tag={tag}>
            {tag} &times;
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
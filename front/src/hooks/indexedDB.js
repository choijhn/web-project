import { openDB } from 'idb';

// DB 초기화 및 ObjectStore 생성
export async function initDB() {
  try {
    return await openDB('ScrapbookDB', 1, {
      upgrade(db) {
        // 'scrapbook' ObjectStore가 없으면 생성
        if (!db.objectStoreNames.contains('scrapbook')) {
          db.createObjectStore('scrapbook', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
  catch (error) {
    console.error('IndexedDB 초기화 실패:', error);
    throw error;
  }
}

// 스크랩북 아이템 추가
export async function addScrapbookItem(db, item) {
  try {
    const tx = db.transaction('scrapbook', 'readwrite'); // 트랜잭션 생성
    const store = tx.objectStore('scrapbook'); // ObjectStore 접근
    const id = await store.add(item); // 아이템 추가
    await tx.done;
    return id;
  } catch (error) {
    console.error('스크랩북 아이템 추가 실패:', error);
    throw error;
  }
}

// 스크랩북 전체 아이템 가져오기
export async function getScrapbookItems(db) {
  try {
    const tx = db.transaction('scrapbook', 'readonly'); // 트랜잭션 생성
    const store = tx.objectStore('scrapbook'); // ObjectStore 접근
    const items = await store.getAll(); // 모든 아이템 가져오기
    await tx.done;
    return items;
  } catch (error) {
    console.error('스크랩북 아이템 가져오기 실패:', error);
    throw error;
  }
}

// 스크랩북 아이템 삭제
export async function deleteScrapbookItem(db, id) {
  try {
    const tx = db.transaction('scrapbook', 'readwrite'); // 트랜잭션 생성
    const store = tx.objectStore('scrapbook'); // ObjectStore 접근
    await store.delete(id); // 아이템 삭제
    await tx.done;
  } catch (error) {
    console.error('스크랩북 아이템 삭제 실패:', error);
    throw error;
  }
}

// 스크랩북 초기화
export async function clearScrapbook(db) {
  try {
    const tx = db.transaction('scrapbook', 'readwrite'); // 트랜잭션 생성
    const store = tx.objectStore('scrapbook'); // ObjectStore 접근
    await store.clear(); // 모든 아이템 삭제
    await tx.done;
  } catch (error) {
    console.error('스크랩북 초기화 실패:', error);
    throw error;
  }
}
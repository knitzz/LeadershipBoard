import { createClient } from 'redis';
export const client = createClient();
client.on('error', err => new Error('Redis Client Error', err));
await client.connect();

export async function setKeyValuePair(key, value) {
    await client.set(key, value);
}

export async function getKey(key) {
    return await client.get(key);
}

export async function updatedScoreCard(userId, score) {
    await client.zIncrBy('test_sorted_list', score, userId);
}

export async function getScore(userId) {
    let rank = await client.zRevRank('test_sorted_list', userId);
    const score = await client.zScore('test_sorted_list', userId);
    
    if( rank != null)
        rank = rank + 1;

    console.log("rank: ", rank);
    console.log("score: ", score);
    return {rank, score};
}

export async function getLeaders(count) {
    let userArray = []
    const resp = await client.zRangeWithScores('test_sorted_list',0, count-1, {REV: true});
    console.log(resp);
    resp.forEach((ele)=>{
        userArray.push({userId: ele.value, score: ele.score});
    })
    return userArray;
}
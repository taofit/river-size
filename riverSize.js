function riverSizes() {
    const matrix = [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 1]
    ]
    const height = matrix.length
    const width = matrix[0].length
    const riversObj = {}
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            const point = matrix[h][w]
            if (point === 1 && !isInRiver(riversObj, h, w)) {
                const nextRiverIdx = Object.keys(riversObj).length
                riversObj[nextRiverIdx] = [[h, w]]
                let nextRiver = riversObj[nextRiverIdx]
                getNextRiver(matrix, nextRiver, height, width)
            }
        }
    }
    const riverCount = Object.keys(riversObj).map(key => riversObj[key].length)

    return riverCount
}
function getNextRiver(matrix, riverObj, height, width) {
    const currentPointInx = Object.keys(riverObj).length - 1

    const h = riverObj[currentPointInx][0]
    const w = riverObj[currentPointInx][1]

    const nextPoints = getAdjacentPoints(riverObj, h, w)
    .filter(adjacentPoint => isLegalAdjacent(height, width, adjacentPoint[0], adjacentPoint[1]))
    .filter(adjacentPoint => isRiverPoint(matrix, adjacentPoint))

    for (let i = 0; i < nextPoints.length; i++) {
        if (!riverObj.some(point => point[0] === nextPoints[i][0] && point[1] === nextPoints[i][1])) {
            riverObj.push(nextPoints[i])
            getNextRiver(matrix, riverObj, height, width)
        }
    }

    return
}

function isRiverPoint(matrix, adjacentPoint) {
    const h = adjacentPoint[0]
    const w = adjacentPoint[1]
    
    return matrix[h][w] === 1
}

function getAdjacentPoints(riverObj, h, w) {
    const leftPoint = [h, w - 1]
    const rightPoint = [h, w + 1]
    const topPoint = [h - 1, w]
    const bottomPoint = [h + 1, w]
    let adjacentPoints = []
    adjacentPoints.push(leftPoint, rightPoint, topPoint, bottomPoint)

    return adjacentPoints
}

function isLegalAdjacent(height, width, h, w) {
    return (0 <= h && h < height) && (0 <= w && w < width)
}

function isInRiver(riversObj, h, w) {
    const riverKeys = Object.keys(riversObj)
    const inRiver = riverKeys.some(key => {
        const river = riversObj[key]
        
        return river.some(point => point[0] === h && point[1] === w)
    })

    return inRiver
}

console.log(riverSizes())
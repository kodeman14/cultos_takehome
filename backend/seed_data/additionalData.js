
const activityList = []

const platform = ['Twitter', 'Facebook', 'Instagram']
const activity = ['Liked', 'Shared', 'Posted']

for (let i=0; i<50; i++) {
  const randomVal = (num) => {return Math.floor(Math.random() * num)}
  activityList.push({
    id: i,
    description: `test activity ${i}`,
    socialPlatform: platform[randomVal(3)],
    socialType: activity[randomVal(3)],
    pointsEarned: randomVal(1000),
    date: new Date(),
  })
}

export default activityList
namespace SpriteKind {
    export const BossEnemy = SpriteKind.create()
    export const SmartEnemy = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BossEnemy, function (sprite, otherSprite) {
    DeathMeteor.destroy()
    info.changeLifeBy(-3)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    MissileSprite = sprites.createProjectileFromSprite(assets.image`MissileSpriteOne`, StarshipSprite, 50, 0)
    pause(MissileCooldown)
})
function createShip () {
    StarshipSprite = sprites.create(assets.image`StarshipSpriteOne`, SpriteKind.Player)
    controller.moveSprite(StarshipSprite, 75, 75)
    StarshipSprite.setStayInScreen(true)
}
function MeteorEnemy () {
	
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BossEnemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 200)
    info.changeScoreBy(1)
})
info.onLifeZero(function () {
    scene.cameraShake(100, 5000)
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 200)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1)
    createShip()
})
let meteor: Sprite = null
let StarshipSprite: Sprite = null
let MissileSprite: Sprite = null
let DeathMeteor: Sprite = null
let MissileCooldown = 0
color.setColor(14, color.rgb(168, 50, 157))
info.setLife(3)
scene.setBackgroundImage(assets.image`GalaxyBackgroundOne`)
game.showLongText("AVOID AND SHOOT THE METEORS TO WIN", DialogLayout.Center)
createShip()
let MeteorSpeed = -100
MissileCooldown = 650
game.onUpdateInterval(1000, function () {
    meteor = sprites.create(assets.image`MeteorSpriteOne`, SpriteKind.Enemy)
    DeathMeteor = sprites.create(assets.image`DeathMeteorSpriteOne`, SpriteKind.BossEnemy)
    meteor.setVelocity(MeteorSpeed, 0)
    DeathMeteor.setVelocity(-75, 0)
    meteor.setPosition(160, randint(5, 115))
    DeathMeteor.setPosition(160, randint(5, 115))
    meteor.setFlag(SpriteFlag.AutoDestroy, true)
    DeathMeteor.setFlag(SpriteFlag.AutoDestroy, true)
    MeteorSpeed += -2
})

const getMensajeSistema = () => ({
  smsrowner: `Este comando 〘 ${global.comando} 〙 solo puede ser usado por el propietario principal del bot.`,
  smsowner: `El comando 〘 ${global.comando} 〙 está reservado para los desarrolladores del bot.`,
  smsmods: `El comando 〘 ${global.comando} 〙 solo está disponible para moderadores.`,
  smspremium: `El comando 〘 ${global.comando} 〙 es exclusivo para usuarios premium.`,
  smsgroup: `El comando 〘 ${global.comando} 〙 solo se puede usar en grupos.`,
  smsprivate: `El comando 〘 ${global.comando} 〙 solo funciona en chats privados.`,
  smsadmin: `El comando 〘 ${global.comando} 〙 requiere que seas administrador del grupo.`,
  smsbotAdmin: `El bot necesita ser administrador para usar el comando 〘 ${global.comando} 〙.`,
  smsrestrict: `Esta función está desactivada por el propietario del bot. No se puede utilizar en este momento.`,

  smsunreg: `Para usar el comando 〘 ${global.comando} 〙 debes estar registrado.\n🧾 𝚄𝚜𝚊: */reg nombre.edad*\n🌙 Ejemplo: */reg tanjiro.13`,

  smsqr: `
╔══════════════════════════╗
║       SUB-BOT – MODO QR       
╟──────────────────────────╢
║ Escanea este código QR con    
║ otro dispositivo o desde la PC 
║ para conectar como Sub-Bot.    
║                                
║ ➊ Abre ⋮ (tres puntos)          
║ ➋ Selecciona “Dispositivos      
║     vinculados”                
║ ➌ Escanea el código QR         
╟──────────────────────────╢
║ ⚠️ El código expira en 54 seg.  
╚══════════════════════════╝`,

  smscode: `
╔═══════════════════════╗
║     SUB-BOT – MODO CÓDIGO     
╟───────────────────────╢
║ Usa este código para vincular  
║ como Sub-Bot con el bot principal.
║                                
║ ➊ Abre ⋮ (tres puntos)          
║ ➋ Selecciona “Dispositivos      
║     vinculados”                
║ ➌ Vincular con número           
║ ➍ Ingresa el código recibido    
╟───────────────────────╢
║ ⚠️ Si tienes otra sesión activa, 
║     desconéctala antes de usar  
║     este código.                
╚═══════════════════════╝`
})

export default getMensajeSistema

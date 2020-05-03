//var TwitterStrategy = require('passport-twitter').Strategy;
// Estrategia de autenticación con Facebook

const passport = require('passport'); 
var FacebookStrategy  = require('passport-facebook').Strategy;
 
const usercontroller = require('./controllers/users')
var config = require('./config');

// Configuración del autenticado con Facebook
passport.use(new FacebookStrategy({
	clientID: config.facebook.key,
	clientSecret: config.facebook.secret,
	callbackURL: '/auth/facebook/callback',
	profileFields : ['id', 'displayName', 'email', 'photos']
}, function(accessToken, refreshToken, profile, done) {    
	
		var userProfile = {
			provider_id	: profile.id,
			provider: profile.provider,
			name: profile.displayName,
			email: profile.emails[0].value,
			photo: profile.photos[0].value
		};

		usercontroller.getProviderUser(userProfile).then((result)=>{
	        
			console.log(result);				
			if(result.length == 0)
			{
				usercontroller.CreateProviderUser(user).then((result)=>{
					if(result = true)
					{
						console.log(result);
						done(null, user = result);
					}
				});
			}
			else
			{
				done(null, user = result);
			}				
		  });			
	}));

	// Serializa al usuario para almacenarlo en la sesión
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserializa el objeto usuario almacenado en la sesión para
	// poder utilizarlo
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});
 
    /*
    // Configuración del autenticado con Twitter
	passport.use(new TwitterStrategy({
		consumerKey		 : config.twitter.key,
		consumerSecret	: config.twitter.secret,
		callbackURL		 : '/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {
		// Busca en la base de datos si el usuario ya se autenticó en otro
		// momento y ya está almacenado en ella
		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			// Si existe en la Base de Datos, lo devuelve
			if(!err && user!= null) return done(null, user);

			// Si no existe crea un nuevo objecto usuario
			var user = new User({
				provider_id	: profile.id,
				provider		 : profile.provider,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			//...y lo almacena en la base de datos
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
    }));
    */

	module.exports = passport;
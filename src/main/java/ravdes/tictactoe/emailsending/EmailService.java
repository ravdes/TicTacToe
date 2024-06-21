package ravdes.tictactoe.emailsending;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor

public class EmailService implements EmailSender{
	private final JavaMailSender mailSender;
	private static final Logger log = LoggerFactory.getLogger(EmailService.class);

	@Override
	@Async
	public void send(String to, String email) {
		try {
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
			helper.setText(email, true);
			helper.setTo(to);
			helper.setSubject("Confirmed your email");
			helper.setFrom("tictactoe21online@gmail.com");
			mailSender.send(mimeMessage);
		} catch (MessagingException e) {
			log.error("Failed to send email error occured {}" , e.getMessage());
			throw new IllegalStateException("Failed to send email");
		}

	}

}
